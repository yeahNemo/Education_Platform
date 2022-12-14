import { Message } from "element-ui";

export function successMsg(val) {
  Message({
    showClose: true,
    message: val,
    type: "success",
  });
}

export function errorMsg(val) {
  Message({
    showClose: true,
    message: val,
    type: "error",
  });
}
