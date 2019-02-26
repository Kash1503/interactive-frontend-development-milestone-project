describe ('noSubmit Tests', function(){
   it ("should return 'false'", function(){
       expect(noSubmit(13)).toBe(false);
   }); 
   it ("should return 'true'", function(){
      expect(noSubmit(1)).toBe(undefined); 
   });
   it ("should return 'true'", function(){
      expect(noSubmit(5)).toBe(undefined); 
   });
   it ("should return 'true'", function(){
      expect(noSubmit(17)).toBe(undefined); 
   });
   it ("should return 'true'", function(){
      expect(noSubmit(24)).toBe(undefined); 
   });
});