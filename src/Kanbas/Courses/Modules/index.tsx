import React, { useState, useEffect, useCallback } from "react";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";
const Modules = () => {
  const { cid } = useParams<string>();
  const modules = useSelector((state: any) => state.modules.modules);
  const dispatch = useDispatch();
  const saveModule = async (module: any) => {
    dispatch(updateModule(module));
  };
  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  };
  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  const fetchModules = useCallback(async (courseId: string) => {
    const modules = await client.findModulesForCourse(courseId);
    dispatch(setModules(modules));
  }, [dispatch]);

  useEffect(() => {
    if (cid) {
      fetchModules(cid);
    }
  }, [cid, fetchModules]);

  const [moduleName, setModuleName] = useState('');
    return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ModulesControls moduleName={moduleName} setModuleName={setModuleName} 
          addModule={() => {
            createModule({ name: moduleName, course: cid });
            setModuleName("");
          }}
        /><br/>
        <ul id="wd-modules" className="list-group rounded-0 ">
          {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3 " />
              {!module.editing && module.name}
              { module.editing && (
                <input className="form-control w-50 d-inline-block" value={module.name}
                       onChange={(e) => 
                        saveModule({ ...module, name: e.target.value })
                       }
                       onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                />
              )}
              <ModuleControlButtons moduleId={module._id} 
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lessons list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}
export default Modules;