/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/error'],
    function(error) {
        function pageInit(context) {
          
        }
        function saveRecord(context) {
            var currentRecord = context.currentRecord;
			
			var autoJE = currentRecord.getValue('custbody_eds_auto_journal_ammor');
			var contractValue = currentRecord.getValue('custbody_eds_contract_value');
			
			// alert('autoJE '+autoJE);
			// alert('contractValue '+contractValue);
            if (autoJE){
				if (contractValue <= 0){
					throw error.create({
						name: 'MISSING_REQ_ARG',
						message: 'Please enter ContractValue before create AutoJournal Ammortization !'
					});
				}else{
					// alert('SO Success !');
					return true;
				}
			}else{
				return true;
			}
        }
        function validateField(context) {
           
            return true;
        }
        function fieldChanged(context) {
          
        }
        function postSourcing(context) {
           
        }
        function lineInit(context) {
           
        }
        function validateDelete(context) {
           
            return true;
        }
        function validateInsert(context) {
          
            return true;
        }
        function validateLine(context) {
         
            return true;
        }
        function sublistChanged(context) {
           
        }
        return {
            // pageInit: pageInit,
            // fieldChanged: fieldChanged,
            // postSourcing: postSourcing,
            // sublistChanged: sublistChanged,
            // lineInit: lineInit,
            // validateField: validateField,
            // validateLine: validateLine,
            // validateInsert: validateInsert,
            // validateDelete: validateDelete,
            saveRecord: saveRecord
        };
    });