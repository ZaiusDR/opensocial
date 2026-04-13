const WhyOpenSocialModal = () => {
  return (
    <dialog id="why_modal" className="modal">
      <article className="modal-box prose max-w-2xl relative">
        <div className="absolute top-0 left-0 right-0 h-1 gradient-card-accent" />
        <h3><b>The problem</b></h3>
        <p>
          Finding open-source projects that are genuinely tackling social issues is harder than it should be.
          GitHub is vast, and most searches return abandoned repositories, projects with no contributors, or results buried under unrelated noise.
        </p>
        <p>
          After spending hours looking for something meaningful — with real activity and a community behind it — and coming up empty,
          the idea was born: automatically collect these projects, enrich them with activity data, and surface them in one place.
        </p>

        <h3><b>What is OpenSocial?</b></h3>
        <p>
          OpenSocial scrapes GitHub for repositories tagged with social-impact topics and presents them through a searchable, filterable interface.
          Every project includes six months of activity history so you can tell at a glance whether it&apos;s actively maintained.
        </p>
        <p>
          You can sort by community size, activity, delivery rate, or open issues — whatever matters most to the kind of contribution you want to make.
        </p>
        <p>
          Topics currently tracked:
        </p>
        <ul>
          <li><i>Climate Change</i></li>
          <li><i>Feminism</i></li>
          <li><i>Humanitarian</i></li>
          <li><i>Non-profit</i></li>
          <li><i>Participatory Democracy</i></li>
          <li><i>Poverty</i></li>
          <li><i>Social Justice</i></li>
          <li><i>Social Change</i></li>
        </ul>
        <p>
          More topics will be added over time.
        </p>
        <p>
          The goal is simple: help developers find a project worth contributing to, and give social-impact projects the visibility they deserve.
        </p>
        <h3><b>Project rating</b></h3>
        <p>
          Each project is scored based on its recent <b>commit activity</b>, number of <b>open issues</b>, and <b>contributor count</b>.
          The algorithm is a simplified version of the{" "}
          <a href={"https://github.com/ossf/criticality_score"}>OpenSSF Criticality Score</a> — a battle-tested model for measuring project health.
        </p>
        <h3><b>Let&apos;s code a better World!! 🦄</b></h3>
        <p>
          As developers, we have a rare opportunity: our skills can directly drive social change.
          Find your cause, pick a project, and start contributing.
        </p>
      </article>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default WhyOpenSocialModal
