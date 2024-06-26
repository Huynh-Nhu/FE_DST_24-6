import { useSelector } from "react-redux"
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default () => {
   const { proxy, lang, functions } = useSelector(state => state)
   const { openTab } = functions
   const stringifiedUser = localStorage.getItem("user");
   const user = JSON.parse(stringifiedUser) || {}
   const [activeLink, setActiveLink] = useState("/");

   return (
      <nav id="sidebar">
         <div class="sidebar_blog_1">
            <div class="sidebar-header">
               <div class="logo_section">
                  <a href="/"><img class="logo_icon img-responsive" src="/images/logo/logo_icon.png" alt="#" /></a>
               </div>
            </div>
            <div class="sidebar_user_info_custom">
               <div class="icon_setting"></div>
               <div class="user_profle_side">
                  <div class="logo_section">
                     <a href="/"><img class="img-responsive" src="/images/logo/logo.png" alt="#" /></a>
                  </div>
               </div>
            </div>
         </div>
         <div class="sidebar_blog_2">
            {/* <h4>{lang["general"]}</h4> */}
            <ul class="list-unstyled components">
               <li className="navbar-item">
                  <NavLink to="/" activeClassName="nav-active">
                     <i class="fa fa-home"></i>
                     <span>{lang["home"]}</span>
                  </NavLink>
               </li>

               <li className="navbar-item">
                  <NavLink
                     to="/projects"
                     activeClassName="nav-active"
                     isActive={() => window.location.pathname.startsWith("/projects")}
                  >
                     <i class="fa fa-briefcase purple_color2"></i>
                     <span>{lang["projects manager"]}</span>
                  </NavLink>
               </li>
               <li className="navbar-item">
                  <NavLink to="/keys" activeClassName="nav-active">
                     <i class="fa fa-key key_color"></i>
                     <span>{lang["key manager"]}</span>
                  </NavLink>
               </li>
               {user.role === "ad" || user.role === "uad" ? (
                  <li className="navbar-item">
                     <NavLink to="/users" activeClassName="nav-active">
                        <i class="fa fa-users green_color3"></i>
                        <span>{lang["accounts manager"]}</span>
                     </NavLink>
                  </li>
               ) : null}

               <li className="navbar-item">
                  <NavLink to="/statis" activeClassName="nav-active">
                     <i class="fa fa-bar-chart-o blue2_color"></i>
                     <span>{lang["statistic"]}</span>
                  </NavLink>
               </li>
               <li className="navbar-item">
                  <NavLink to="/report" activeClassName="nav-active">
                     <i class="fa fa-file-excel-o green_color"></i>
                     <span>{lang["report"]}</span>
                  </NavLink>
               </li>
               <li className="navbar-item">
                  <NavLink to="/workflow" activeClassName="nav-active">
                     <i class="fa fa-code-fork"></i>
                     <span>{lang["site-map"]}</span>
                  </NavLink>

               </li>
               <li className="navbar-item">
                  <NavLink to="/about" activeClassName="nav-active">
                     <i class="fa fa-paper-plane red_color"></i>
                     <span>{lang["about us"]}</span>
                  </NavLink>
               </li>
               {/* <li>
                  <a href="/contacts">
                     <i class="fa fa-paper-plane red_color"></i> <span>{lang["contacts"]}</span></a>
               </li> */}
               {/* <li><a href="/about"><i class="fa fa-info purple_color2"></i> <span>{lang["about us"]}</span></a></li> */}
               {/* <li><a href="/settings"><i class="fa fa-cog yellow_color"></i> <span>{lang["settings"]}</span></a></li> */}
               {user.role === "uad" ? (
                  <li className="navbar-item">
                     <NavLink to="/logs" activeClassName="nav-active">
                        <i class="fa fa-shield"></i>
                        <span>{lang["log.title"]}</span>
                     </NavLink>
                  </li>
               ) : null}
            </ul>
         </div>
         <div class="footer-custom">
            <p>&copy; 2023 - Designed by Mylan Group </p>
         </div>
      </nav>
   )
}