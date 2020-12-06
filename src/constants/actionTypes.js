const actionTypes = {
  API_BEGIN: 'API_BEGIN',
  API_ERROR: 'API_ERROR',
  AUTH_ERROR: 'AUTH_ERROR',
  API_SUCCESS: 'API_SUCCESS',

  UPDATE_DB: 'app.db.UPDATE',
  SET_ACTIVE_PROJECT: 'app.projects.SET_ACTIVE_PROJECT',
  UPDATE_PROJECTS: 'app.projects.UPDATE',
  CREATED_PROJECT: 'app.project.CREATED',
  DELETE_PROJECT: 'app.project.DELETE',
  UPDATE_CANVASES: 'app.canvases.UPDATE',
  CREATE_CANVAS: 'app.canvases.CREATE',
  DELETE_CANVAS: 'app.canvases.DELETE',
  UPDATE_SECTION: 'app.sections.UPDATE',
  CREATE_SECTIONS: 'app.sections.CREATE',
  DELETE_SECTION: 'app.sections.DELETE',
  DELETE_IMAGE_SECTION: 'app.sections.DELETE_IMAGE_SECTION',
  CREATE_IMAGE: 'app.images.CREATE',
  DELETE_IMAGE: 'app.images.DELETE',
  UPDATE_WEBVIEW: 'app.canvas.UPDATE_WEBVIEW',
  SET_PINS: 'app.canvas.SET_PINS',
  SELECT_PIN: 'app.canvas.SELECT_PIN',
  ADD_PIN: 'app.canvas.ADD_PIN',
  REMOVE_PIN: 'app.canvas.REMOVE_PIN',
  EDIT_PIN: 'app.canvas.EDIT_PIN',
  ADD_TO_CANVAS: 'app.canvas.ADD',
  REMOVE_FROM_CANVAS: 'app.canvas.REMOVE',
  SET_CANVAS: 'app.canvas.SET',
  UPDATE_CANVAS: 'app.canvas.UPDATE',
  CHANGE_CANVAS_GRID_MODE: 'app.canvas.GRID_MODE',
  CHANGE_CANVAS_MODE: 'app.canvas.EDIT_MODE',

  CHANGE_PROJECT: 'app.CHANGE_PROJECT',

  SET_ZOOM: 'app.SET_ZOOM',

  CHECK_AUTH: 'app.auth.CHECK_AUTH',
  AUTHORISE: 'app.auth.AUTHORISE',
  LOGOUT: 'app.auth.LOGOUT',
}

export default actionTypes
