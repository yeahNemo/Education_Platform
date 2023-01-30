import Toast from 'muse-ui-toast'
function successMsg (msg) {
  Toast.success(msg)
}

function errorMsg (msg) {
  Toast.error(msg)
}

export { successMsg, errorMsg }
