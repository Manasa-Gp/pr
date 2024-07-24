import ModuleEditor from "./ModuleEditior";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { FaBan } from "react-icons/fa";
export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
{ moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
      data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </button>
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Publish All
        </button>
        <ul className="dropdown-menu">
          <li>
            <button id="wd-publish-all-modules-and-items-btn" className="dropdown-item">
              <GreenCheckmark />
              Publish all modules and items
            </button>
          </li>
          <li>
            <button id="wd-publish-modules-only-button" className="dropdown-item">
              <GreenCheckmark />
              Publish modules only
            </button>
          </li>
          <li>
            <button id="wd-unpublish-all-modules-and-items-button" className="dropdown-item">
              <FaBan />
              Unpublish all modules and items
            </button>
          </li>
          <li>
            <button id="wd-unpublish-modules-only-btn" className="dropdown-item">
              <FaBan />
              Unpublish modules only
            </button>
          </li>
          {/* Create two more items with IDs wd-unpublish-all-modules-and-items and
              wd-unpublish-modules-only with labels Unpublish all modules and items
              and Unpublish modules only */}
        </ul>
      </div>
      <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">
        View Progress
      </button>
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
        Collapse All
      </button>
      {/* Implement the View Progress and Collapse All buttons
          with IDs wd-view-progress and wd-collapse-all */}
      <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                    setModuleName={setModuleName} addModule={addModule} />
    </div>
  );
}
