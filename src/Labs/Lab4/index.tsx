import React from "react";
import ReduxExamples from "./ReduxExamples";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import HelloRedux from "./ReduxExamples/HelloRedux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import AddRedux from "./ReduxExamples/AddRedux";
import TodoList from "./ReduxExamples/todos/TodoList";
export default function Lab4() {
    function sayHello() {
    alert("Hello");
  }
    return (
        <div id="wd-lab4" className="state-redux">
          <h3>Lab 4</h3>
          <ClickEvent/><br/>
          <PassingDataOnEvent/><br/>
          <PassingFunctions theFunction={sayHello} /><br/>
          <EventObject/><br/>
          <Counter/><br/>
          <BooleanStateVariables/><br/>
          <StringStateVariables/><br/>
          <DateStateVariable/><br/>
          <ObjectStateVariable/><br/>
          <ArrayStateVariable/><br/>
          <ParentStateComponent/><br/>
          <ReduxExamples/>
          <HelloRedux/><br/>
          <CounterRedux/><br/>
          <AddRedux/><br/>
          <TodoList/><br/>
        </div>
);
}