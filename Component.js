sap.ui.define(['sap/ui/core/UIComponent', "sap/ui/model/json/JSONModel"],
	function(UIComponent, JSONModel) {
	"use strict";

	var Component = UIComponent.extend("cis.cisTransitShipments.Component", {

		onCardReady: function (oCard) {
			// resolving the destination
			oCard.resolveDestination("myDestination").then(function (sUrl) {
				var oJsonModel = new JSONModel();
				this.setModel(oJsonModel, "shipments"); 
				oCard.request({
					"url": "{{destinations.myDestination}}/event-app/Fedex",
					"mode": "cors",
					"method": "GET",
					"withCredentials": true
				}).then(function (oData) {
					// If needed modify the data or chain another request.
					// let aResponseData = this.formatResponseData(oData.d.results);
					this.getModel("shipments").setProperty("/shipmentDetails", oData.d.results);
					this.getModel("i18n").getResourceBundle().getText("IN_TRANSITSHIPMENTS_COUNT", [oData.d.results.length]);
				}.bind(this)).catch(function (oError) {
					console.log(oError);
				});
			}.bind(this));
		},
	});

	return Component;

});
