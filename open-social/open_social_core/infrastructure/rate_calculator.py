import math

from dateutil import parser
from dateutil import relativedelta
from dateutil import utils


def get_project_rating(created, pushed, contributors_count, commits):
    created_months_threshold = 60
    pushed_months_threshold = 60
    contributors_count_threshold = 50
    commits_frequency_threshold = 100

    created_months_weight = 1
    pushed_months_weight = -1
    contributors_count_weight = 1.5
    commits_frequency_weight = 1

    total_weight = (
        created_months_weight
        + pushed_months_weight
        + contributors_count_weight
        + commits_frequency_weight
    )

    created_months = _get_months_since(created)
    pushed_months = _get_months_since(pushed)
    commits_frequency = _get_commits_per_week(commits)

    rating = round((
        _get_metric_score(created_months, created_months_threshold, created_months_weight) +
        _get_metric_score(pushed_months, pushed_months_threshold, pushed_months_weight) +
        _get_metric_score(contributors_count, contributors_count_threshold, contributors_count_weight) +
        _get_metric_score(commits_frequency, commits_frequency_threshold, commits_frequency_weight)
    ) / total_weight, 2)

    return min(rating, 1.00)


def _get_metric_score(metric, max_value, weight):
    return (math.log(1 + metric) / math.log(1 + max(metric, max_value))) * weight


def _get_months_since(date):
    date = date[:-1]  # Remove trailing 'Z'
    delta = relativedelta.relativedelta(utils.today(), parser.isoparse(date))
    return delta.years * 12 + delta.months


def _get_commits_per_week(commits):
    weeks_in_six_months = 24
    return commits / weeks_in_six_months
