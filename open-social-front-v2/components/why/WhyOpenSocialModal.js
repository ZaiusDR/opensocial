const WhyOpenSocialModal = () => {
  return (
    <dialog id="why_modal" className="modal">
      <article className="modal-box prose items-start">
        <h3><b>The problem</b></h3>
        <p>
          Searching for Open Source projects aimed to have any social impact can be
          very difficult. The projects are scattered around Github (which is huge),
          there are tons of abandoned projects, or they simply didn't get to have
          enough collaborators to keep going.
        </p>
        <p>
          I found myself, spending hours trying to find something meaningful, with
          enough activity and I just simply gave up. Other than some curated lists
          in some outdated pages is what I could find. So, what if tried to
          automatically collect them, gather activity stats and put them together
          in a single place, so others can easily find a project to contribute with?
        </p>

        <h3><b>What is OpenSocial?</b></h3>
        <p>
          OpenSocial is an opinionated collection of Open-Source projects,
          including their activity for the last six months, gathered from Github
          based on different searches by terms related to social issues.
        </p>
        <p>
          The Projects can be sorted by different criteria, so it's easier for you
          to find the one you want. (Bigger communities, more activity and
          delivery rate, or maybe more Issues to solve, etc...)
        </p>
        <p>
          The current keywords are:
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

          But the list will grow to include more.
        </p>
        <p>
          The <b>objective</b> is to give people the possibility to find a
          project they want to collaborate with. And also, give social impact
          projects more visibility, so more people contribute on them.
        </p>
        <h3><b>Project Rating</b></h3>
        <p>
          The Rate of a project in OpenSocial is calculated based mainly in the
          latest <b> Commits Activity</b>, the number of <b>Open Issues</b> and
          the number of <b>Contributors</b> of a project.
          I got inspired by the <a href={"https://github.com/ossf/criticality_score"}>Criticality Score Project</a>,
          and just implemented a simplified version of their algorithm.
        </p>
        <h3><b>Finally</b></h3>
        <p>
          As developers we have the opportunity to be part of the Open Source
          philosophy's beauty, and have an impact on the society. So... <b>Let's code a
          better World!! 🦄</b>
        </p>
      </article>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default WhyOpenSocialModal
