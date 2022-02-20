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
		var autoJournal = newRecord.getValue('custbody_eds_auto_journal_ammor'); 
		var orderStatus = newRecord.getValue('orderstatus');
		var count = newRecord.getValue('custbody_eds_count');
		var projectDuration = newRecord.getValue('custbody_eds_project_duration');
		
		log.debug ('Status Order : '+orderStatus);
		if (context.type === context.UserEventType.APPROVE, autoJournal === true && orderStatus === 'B'){
			log.debug ('APPROVED and Journal');
			var entity = newRecord.getValue('entity');
			var subsidiary = newRecord.getValue('subsidiary');
			var department = newRecord.getValue('department');
			var classValue = newRecord.getValue('class');
			var locationValue = newRecord.getValue('location');
			var service = newRecord.getValue('cseg_eds_prod_serv');
			var projectedValue = newRecord.getValue('custbody_eds_projected_total');
			var contractValue = newRecord.getValue('custbody_eds_contract_value');
			var discountValue = projectedValue - contractValue;
			log.debug('discount value : '+discountValue);
			
			//newRecord.setValue('memo', 'Memo masuk nih');
			var recordidSO = context.newRecord.id;
			// Pending Aproval A
			
			// 217	1-1400	Unbilled Receivables Debit (Value Contract)
			// 355	2-1312	Deffered Discount Debit (Value Discount)
			// 354	2-1311	Deffered Revenue Creadit (Value Proposal)
			var createJournal = record.create({
				type			: record.Type.JOURNAL_ENTRY, 
				isDynamic		: true
			});
			
			createJournal.setValue('subsidiary', subsidiary);
			createJournal.setValue('custbody_eds_related_transaction', recordidSO);
			
			
			// Journal Unbilled Receivables
			createJournal.selectNewLine({
				sublistId : 'line'
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'account',
				value : 217	
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'debit',
				value : contractValue
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'entity',
				value : entity
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'department',
				value : department
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'class',
				value : classValue
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'location',
				value : locationValue
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'cseg_eds_prod_serv',
				value : service
			});
			
			createJournal.commitLine({
				sublistId : 'line'
			});
			
			// ===================
			// Journal Deffered Revenue
			
			createJournal.selectNewLine({
				sublistId : 'line'
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'account',
				value : 354	
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'credit',
				value : projectedValue
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'entity',
				value : entity
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'department',
				value : department
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'class',
				value : classValue
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'location',
				value : locationValue
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'cseg_eds_prod_serv',
				value : service
			});
			
			createJournal.setCurrentSublistValue({
				sublistId : 'line',
				fieldId : 'schedule',
				value : setRevenueSchedule(projectDuration)
			});
			
			createJournal.commitLine({
				sublistId : 'line'
			});
			
			// Journal jika ada Discount
			if (discountValue > 0){
				createJournal.selectNewLine({
					sublistId : 'line'
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'account',
					value : 355	
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'debit',
					value : discountValue
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'entity',
					value : entity
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'department',
					value : department
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'class',
					value : classValue
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'location',
					value : locationValue
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'cseg_eds_prod_serv',
					value : service
				});
				
				createJournal.setCurrentSublistValue({
					sublistId : 'line',
					fieldId : 'schedule',
					value : setDiscountSchedule(projectDuration)
				});
				
				createJournal.commitLine({
					sublistId : 'line'
				});
			}
			
			var recordId = createJournal.save();
			
			var SOMaster = record.load({
				type: record.Type.SALES_ORDER, 
				id: recordidSO,
				isDynamic: true,
			});
			
			SOMaster.setValue('custbody_eds_count', 1);
			
			SOMaster.setValue('custbody_eds_related_transaction', recordId);
			
			SOMaster.save();
		}
    }
	
	function setDiscountSchedule(month){
		var idSchedule;
		switch(month) {
			case 1:
				var idSchedule = 25;
				break;
			case 2:
				var idSchedule = 26;
				break;
			case 3:
				var idSchedule = 27;
				break;
			case 4:
				var idSchedule = 28;
				break;
			case 5:
				var idSchedule = 29;
				break;
			case 6:
				var idSchedule = 30;
				break;
			case 7:
				var idSchedule = 31;
				break;
			case 8:
				var idSchedule = 32;
				break;
			case 9:
				var idSchedule = 33;
				break;
			case 10:
				var idSchedule = 34;
				break;
			case 11:
				var idSchedule = 35;
				break;
			case 12:
				var idSchedule = 36;
				break;
			case 13:
				var idSchedule = 37;
				break;
			case 14:
				var idSchedule = 38;
				break;
			case 15:
				var idSchedule = 39;
				break;
			case 16:
				var idSchedule = 40;
				break;
			case 17:
				var idSchedule = 41;
				break;
			case 18:
				var idSchedule = 42;
				break;
			case 19:
				var idSchedule = 43;
				break;
			case 20:
				var idSchedule = 44;
				break;
			case 21:
				var idSchedule = 45;
				break;
			case 22:
				var idSchedule = 46;
				break;
			case 23:
				var idSchedule = 47;
				break;
			case 24:
				var idSchedule = 48;
				break;
			 default:
				break;
		}
		
		return idSchedule;
	}
	
	function setRevenueSchedule(month){
		var idSchedule;
		switch(month) {
			case 1:
				var idSchedule = 1;
				break;
			case 2:
				var idSchedule = 2;
				break;
			case 3:
				var idSchedule = 3;
				break;
			case 4:
				var idSchedule = 4;
				break;
			case 5:
				var idSchedule = 5;
				break;
			case 6:
				var idSchedule = 6;
				break;
			case 7:
				var idSchedule = 7;
				break;
			case 8:
				var idSchedule = 8;
				break;
			case 9:
				var idSchedule = 9;
				break;
			case 10:
				var idSchedule = 10;
				break;
			case 11:
				var idSchedule = 11;
				break;
			case 12:
				var idSchedule = 12;
				break;
			case 13:
				var idSchedule = 13;
				break;
			case 14:
				var idSchedule = 14;
				break;
			case 15:
				var idSchedule = 15;
				break;
			case 16:
				var idSchedule = 16;
				break;
			case 17:
				var idSchedule = 17;
				break;
			case 18:
				var idSchedule = 18;
				break;
			case 19:
				var idSchedule = 19;
				break;
			case 20:
				var idSchedule = 20;
				break;
			case 21:
				var idSchedule = 21;
				break;
			case 22:
				var idSchedule = 22;
				break;
			case 23:
				var idSchedule = 23;
				break;
			case 24:
				var idSchedule = 24;
				break;
			 default:
				break;
		}
		
		return idSchedule;
	}
	
    return {
        // beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    };
    
});
