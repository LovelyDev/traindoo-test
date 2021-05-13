import React from 'react';
import style from './style.css';
import { RouteComponentProps } from 'react-router';
import { Exercise } from 'app/components';

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const App = ({ history, location }: App.Props) => {
  return (
    <div className={style.normal}>
      <Exercise />
    </div>
  );
};
