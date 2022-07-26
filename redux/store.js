import React, {Component} from "react";
import {createStore} from "redux";
import reduser from "./reducer"

const store = createStore(reduser);

export default store
