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
		
		if (context.type === context.UserEventType.CREATE || context.type === context.UserEventType.EDIT){
			var jeMaster = record.load({
				type : record.Type.JOURNAL_ENTRY,
				id : context.newRecord.id,
				isDynamic : true
			});
				
			var tranId = jeMaster.getValue({
				fieldId : 'tranid'
			});
			
			var tranDate = jeMaster.getValue({
				fieldId : 'trandate'
			});
			
			// var MM = ('0' + (tranDate.getMonth() + 1)).slice(-2);
			var MM = tranDate.getMonth() + 1;
			var YYYY = tranDate.getFullYear();
			var YY = YYYY.toString().substr(-2);	
			
			log.debug(tranId + ' '+tranDate);
			
			jeMaster.setValue({
				fieldId : 'tranid',
				value : 'JE/EGK/'+monthToRomawi(MM)+'/'+YY+'/'+tranId.slice(-3)
			});
			
			jeMaster.save();
		}
	}

	
	function monthToRomawi(month){
		var romawi;
		switch(month){
			case 1:
				romawi = 'I';
				break;
			case 2:
				romawi = 'II';
				break;
			case 3:
				romawi = 'III';
				break;
			case 4:
				romawi = 'IV';
				break;
			case 5:
				romawi = 'V';
				break;
			case 6:
				romawi = 'VI';
				break;
			case 7:
				romawi = 'VII';
				break;
			case 8:
				romawi = 'VIII';
				break;
			case 9:
				romawi = 'IX';
				break;
			case 10:
				romawi = 'X';
				break;
			case 11:
				romawi = 'XI';
				break;
			case 12:
				romawi = 'XII';
				break;
			default:
				break;
		}
		return romawi;
	}
	
    return {
        // beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
