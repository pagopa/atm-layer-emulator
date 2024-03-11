export const CREATE_BPMN_API = "/bpmn";
export const BPMN_DEPLOY_API = "/bpmn/deploy/:bpmnId/version/:modelVersion";
export const GET_ALL_BPMN_FILTER = "/bpmn/filter";
export const UPGRADE_BPMN_PATH = "/bpmn/upgrade";
export const GET_ALL_BPMN_ASSOCIATED = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const BPMN_ASSOCIATE_API = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const DELETE_ASSOCIATE_BPMN = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const BPMN_DELETE = "/bpmn/disable/:bpmnId/version/:modelVersion";
export const UPDATE_ASSOCIATE_BPMN = "/bpmn/associations/:bpmnId/version/:modelVersion";
export const BPMN_DOWNLOAD_API = "/bpmn/downloadFrontEnd/:bpmnId/version/:modelVersion";

export const GET_ALL_WORKFLOW_RESOURCES_FILTER = "/workflow-resource/filter";
export const CREATE_WR_API = "/workflow-resource";
export const WR_UPDATE = "/workflow-resource/update/:workflowResourceId";
export const WR_ROLLBACK = "/workflow-resource/rollback/:workflowResourceId";
export const WR_DEPLOY = "/workflow-resource/deploy/:workflowResourceId";
export const WR_DOWNLOAD = "/workflow-resource/downloadFrontEnd/:workflowResourceId";
export const WR_DELETE = "/workflow-resource/disable/:workflowResourceId";

export const GET_ALL_RESOURCES_FILTER = "/resources/filter";
export const RESOURCES_UPDATE = "/resources/:resourceId";
export const RESOURCES_CREATE = "/resources";
export const RESOURCES_DELETE = "/resources/disable/:uuid";

export const USER_EMAIL = "/info/email";
export const TASK_MAIN = "/task/main";
