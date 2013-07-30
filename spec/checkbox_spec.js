// Create a test suite
describe("Checkbox Tests", function() {

	var Alloy = require("alloy");
	var widget = Alloy.createWidget("checkbox");
	var view = widget.getView();

	describe("can generate a usable checkbox widget", function() {

		it("can init the checkbox value with string attributes", function() {
		
			var tester = Alloy.createWidget("checkbox", {value:'true'});
			expect(tester.getValue()).toEqual('true');
			
			tester = Alloy.createWidget("checkbox", {value:'false'});
			expect(tester.getValue()).toEqual('false');
			
		});
		
		it("can set and get the checkbox value", function() {
			
			widget.setValue(true);
			expect(widget.getValue()).toEqual(true);

			widget.setValue(false);
			expect(widget.getValue()).toEqual(false);

		});
		
		it("can change value when clicked", function() {
			
			runs(function(){
				widget.setValue(false);
				view.fireEvent('click');
			});
			
			waitsFor(function(){
				return widget.getValue();
			}, "widget didn't change value", 100);

			runs(function(){
				expect(widget.getValue()).toEqual(true);
				view.fireEvent('click');
			});
			
			waitsFor(function(){
				return !widget.getValue();
			}, "widget didn't change value", 100);

			runs(function(){
				expect(widget.getValue()).toEqual(false);
			});
			
		});

		
		it("sends correct event when clicked", function() {

			var eventValue = false;
			view.addEventListener('change', function(e){
				eventValue = e.value;
			});

			runs(function(){
				widget.setValue(false);
				view.fireEvent('click');
			});
			
			waitsFor(function(){
				return eventValue;
			}, "widget didn't send event or wrong value", 100);

			runs(function(){
				expect(eventValue).toEqual(true);
				view.fireEvent('click');
			});
			
			waitsFor(function(){
				return !eventValue;
			}, "widget didn't send event or wrong value", 100);

			runs(function(){
				expect(eventValue).toEqual(false);
			});
			
		});

	});
	
}); 