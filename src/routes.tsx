const ROUTES = {
	HOME: "/",
	SCANNER_PAGE: "/scanner",
	WARNING_CODE: "/warning-code",
	EC_FISCAL_CODE: "/ec-fiscal-code",
	ERROR_PAGE: "/error",
	BPMN: "/bpmn",
	RESOURCES: "/resources",
	WORKFLOW_RESOURCES: "/workflow_resources",
	BPMN_DETAILS: "/bpmnId/:bpmnId/modelVersion/:modelVersion",
	WORKFLOW_RESOURCE_DETAILS: "/workflowResourceId/:workflowResourceId",
	RESOURCES_DETAILS: "/resourceId/:resourceId",
	CREATE_BPMN: "/bpmn/create",
	ASSOCIATE_BPMN: "/bpmn/associate",
	CREATE_RESOURCE: "/resources/create",
	UPGRADE_BPMN: "/bpmn/upgrade",
	CREATE_WR: "/workflow_resources/create",
	LOGIN: "/login",
	LOGIN_BACK:"/login/callback",
};

export default ROUTES;
