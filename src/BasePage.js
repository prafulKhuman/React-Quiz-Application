import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";


const Dashboard = lazy(() =>
  import("./Partition/DashBoard")
);

export default function BasePage() {
  return (
    <Suspense >
      <Switch>
        {<Redirect exact from="/" to="/dashboard" />}
        
        <Route path="/dashboard" component={Dashboard} />
        
      </Switch>
    </Suspense>
  );
}
