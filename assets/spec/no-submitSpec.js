describe ('noSubmit Tests', function(){
   it ("when 'return' key is pressed, should return 'false'", function(){
       expect(noSubmit(13)).toBe(false);
   }); 
   it ("when any key other than 'return' is pressed, should return 'true'", function(){
      expect(noSubmit(1)).toBe(undefined); 
   });
   it ("when any key other than 'return' is pressed, should return 'true'", function(){
      expect(noSubmit(5)).toBe(undefined); 
   });
   it ("when any key other than 'return' is pressed, should return 'true'", function(){
      expect(noSubmit(17)).toBe(undefined); 
   });
   it ("when any key other than 'return' is pressed, should return 'true'", function(){
      expect(noSubmit(24)).toBe(undefined); 
   });
});