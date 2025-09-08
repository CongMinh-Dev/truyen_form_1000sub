import axios from "axios";
export const http = axios.create({
  // endpoint
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMCIsIkhldEhhblN0cmluZyI6IjAxLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTcyNTE0ODgwMDAwMCIsImlhdCI6MTcyNTgyNDcyMiwiZXhwIjoxNzI2MjU2NzIyfQ.IOTy9CbaV5LVfEYarlNvGtn_v_PU-H_DIcFsm-E1lEE",
  },
  timeout: 30000,
});
