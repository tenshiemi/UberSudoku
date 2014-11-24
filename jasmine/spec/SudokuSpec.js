describe("UberSudoku", function() {
  describe("when a value is entered in an input field", function() {
    describe("validate cell input", function() {
      it("validate that input is a number", function() {
        expect(isInputValid(3)).toEqual(true);
      });

      it("returns false if input is not a number", function() {
        expect(isInputValid("a")).toEqual(false);
      });
    });

    describe("validate cell input within the row", function() {
      it("is valid if input does not already exist in its row", function() {
        expect(isCellGroupValid(1, [2,3,4])).toEqual(true);
      });

      it("is invalid if it is a dup value in the same row", function() {
        expect(isCellGroupValid(1, [1,2,3,1])).toEqual(false);
      });
    });

    it("should strip undefined values from array of cell values")

    it("find the number of instances that a value occurs in an array of cells", function() {
      expect(findInstances(1, [1, 1, 2, 3, 1])).toEqual(3);
    });
  });
});
