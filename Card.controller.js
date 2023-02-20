sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("cis.cisTransitShipments.Card", {
		onInit: function () {
			var oModel = new JSONModel({
				"cities": [
					{
						"text": "Berlin",
						"key": "BR"
					},
					{
						"text": "London",
						"key": "LN"
					},
					{
						"text": "Madrid",
						"key": "MD"
					},
					{
						"text": "Prague",
						"key": "PR"
					},
					{
						"text": "Paris",
						"key": "PS"
					},
					{
						"text": "Sofia",
						"key": "SF"
					},
					{
						"text": "Vienna",
						"key": "VN"
					}
				]
			});
			this.getView().setModel(oModel);
		},

		onPressRefresh: function () {
			let oCard = this.getOwnerComponent().getComponentData().__sapUiIntegration_card;
			var oJsonModel = new JSONModel();
			this.getView().setModel(oJsonModel, "shipments");
			oCard.request({
				"url": "{{destinations.myDestination}}/event-app/Fedex",
				"mode": "cors",
				"method": "GET",
				"withCredentials": true
			}).then(function (oData) {
				// If needed modify the data or chain another request.
				this.getView().getModel("shipments").setProperty("/shipmentDetails", oData.d.results);
			}.bind(this)).catch(function (oError) {
				console.log(oError); 
			});
		},
	});
});