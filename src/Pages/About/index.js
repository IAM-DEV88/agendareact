import "./About.css";
import { NavLink } from "react-router-dom";
import Layout from "../../Components/Layout";

function About() {
  return (
    <>
      <Layout>
        <section className="about">
          <NavLink to="/agenda">
            <div className="about-container">
              <section>
                <div className="main-tag">
                  <span>Fullstack Developer</span>
                </div>
                <article className="project">
                  <div className="author">Ioan Andres Muñoz</div>
                  <div className="alias">IAM-DEV88</div>
                  <div className="demo">View demo</div>
                  <div className="application">Agenda Ledger</div>
                </article>
                <footer className="secondary-tag">
                  <span>Bootstrap</span>
                  <span>JS</span>
                  <span>Node</span>
                  <span>React</span>
                  <span>MUI</span>
                  <span>RouterDom</span>
                  <span>Toastify</span>
                  <span>Axios</span>
                  <span>Express</span>
                </footer>
              </section>
            </div>
          </NavLink>
        </section>
      </Layout>
    </>
  );
}

export default About;
