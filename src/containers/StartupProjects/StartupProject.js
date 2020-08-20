import React from "react";
import "./StartupProjects.css";
import { bigProjects } from "../../portfolio";
import { Fade } from "react-reveal";
import {isMobile} from 'react-device-detect';

export default function StartupProject() {
  function openProjectInNewWindow(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  return (
    <Fade bottom duration={1000} distance="20px">
    <div className="main" id="projects">
      <div>
        <h1 className="skills-heading">{bigProjects.title}</h1>
        <p className="subTitle project-subtitle">{bigProjects.subtitle}</p>
        <div className="startup-projects-main">
            {bigProjects.projects.map(project => {
              if(isMobile) {
                return (
                <div className="startup-project-mobile">
                  <div className="saaya-health-div" onClick={() => openProjectInNewWindow(project.link)}>
                    <img width="70vmin" height="70vmin" alt={project.title} src={project.image}></img>
                  </div>
                </div>
                );
              } else {
                return (
                  <div className="startup-project-text">
                    <div className="saaya-health-div" onClick={() => openProjectInNewWindow(project.link)}>
                      <img alt={project.title} src={project.image}></img>
                      <p className="startup-project-title">{project.title}</p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
    </Fade>
  );
}
