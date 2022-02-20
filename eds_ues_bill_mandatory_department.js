/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/ui/serverWidget', 'N/runtime'],

function(record, serverWidget, runtime) {
   
    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {string} scriptContext.type - Trigger type
     * @param {Form} scriptContext.form - Current form
     * @Since 2015.2
     */
	 
	 
	function beforeLoad(context) {
		var form = context.form;
		var newRecord = context.newRecord;
		var sublistName	= context.sublistId;
		var FieldName = context.FieldId;
		
		var ExpObj = form.getSublist({id : 'expense'});
		var ItemObj = form.getSublist({id : 'item'});
		
		var departExp = ExpObj.getField({id : 'department'});
		var departItem = ItemObj.getField({id : 'department'});

		if (context.type == context.UserEventType.CREATE || context.type == context.UserEventType.EDIT){
			departExp.isMandatory = true;
			departItem.isMandatory = true;
			
			log.debug('department' +departExp);
			log.debug('department' +departItem);
		}
	} 

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function beforeSubmit(context) {

    }

    /**
     * Function definition to be triggered before record is loaded.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.newRecord - New record
     * @param {Record} scriptContext.oldRecord - Old record
     * @param {string} scriptContext.type - Trigger type
     * @Since 2015.2
     */
    function afterSubmit(context) {

    }

    return {
        beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    };
   
});