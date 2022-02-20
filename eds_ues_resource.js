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
		var newRecord = context.newRecord;
		var sublistName = context.sublistId;
		var fieldName = context.fieldId;
		
		

		if (context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT){
			var calProjCostId = newRecord.getValue('custrecord_eds_res_cal_proj_cost');
			
			var masterCal = record.load({
				type: 'customrecord_eds_cal_project_cost', 
				id: calProjCostId,
				isDynamic: true,
			});
			
			var projSubCost = masterCal.getValue('custrecord_eds_cal_proj_sub_cost');
			
			log.debug('Masuk : '+projSubCost);
			
			var projOpp = masterCal.getValue('custrecord_eds_cal_opportunity');
			
			var masterOpp = record.load({
				type : record.Type.OPPORTUNITY,
				id : projOpp,
				isDynamic : true
			});
			
			masterOpp.setValue('projectedtotal', projSubCost);
			masterOpp.setValue('rangelow', projSubCost);
			masterOpp.setValue('rangehigh', projSubCost);
			masterOpp.save();
		}
		
		if (context.type === context.UserEventType.DELETE){
			var calProjCostId = newRecord.getValue('custrecord_eds_res_cal_proj_cost');
			
			var masterCal = record.load({
				type: 'customrecord_eds_cal_project_cost', 
				id: calProjCostId,
				isDynamic: true,
			});
			
			var projSubCost = masterCal.getValue('custrecord_eds_cal_proj_sub_cost');
			
			log.debug('DELETED'+calProjCostId+' '+projSubCost);
			
			var projOpp = masterCal.getValue('custrecord_eds_cal_opportunity');
			
			var masterOpp = record.load({
				type : record.Type.OPPORTUNITY,
				id : projOpp,
				isDynamic : true
			});
			
			masterOpp.setValue('projectedtotal', projSubCost);
			masterOpp.setValue('rangelow', projSubCost);
			masterOpp.setValue('rangehigh', projSubCost);
			masterOpp.save();
			
			
		}
    }
	
    return {
        // beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
