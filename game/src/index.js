/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { Local } from "boardgame.io/multiplayer";
import { TicTacToe } from "./game";
import { TicTacToeBoard } from "./board";

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: Local(),
  debug: false
});

const App = () => (
  <div>
    Player 0
    <TicTacToeClient playerID="0" />
    <br />
    Player 1
    <TicTacToeClient playerID="1" />
  </div>
);

render(<App />, document.getElementById("root"));
