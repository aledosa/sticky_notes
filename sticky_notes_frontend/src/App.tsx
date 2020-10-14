import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { HomeScreen } from "./components/screens/HomeScreen";

const Root: React.FC = () => {
  return <Redirect to="/sticky_notes_app" />;
};

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact component={Root} path="/" />
        <Route component={HomeScreen} path="/sticky_notes_app" />
      </Switch>
    </React.Fragment>
  );
};
