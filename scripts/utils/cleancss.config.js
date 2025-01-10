module.exports = {
  format: {
    breaks: {
      afterAtRule: true,
      afterBlockBegins: true,
      afterBlockEnds: true,
      afterComment: true,
      afterProperty: true,
      afterRuleBegins: true,
      afterRuleEnds: 2,
      beforeBlockEnds: true,
      betweenSelectors: true,
    },
    indentBy: 2,
    spaces: {
      aroundSelectorRelation: true,
      beforeBlockBegins: true,
      beforeValue: true,
    },
    semicolonAfterLastProperty: true,
  },
  level: {
    1: {
      all: false,
    },
    2: {
      all: false,
      mergeAdjacentRules: true,
      removeEmpty: true,
    },
  },
  plugins: [
    {
      level1: {
        property: function addFallbackFontCSS(_, property) {
          if (Array.isArray(property.value)) {
            property.value.forEach((row, i) => {
              row.forEach((value, j) => {
                if (value === "'Open Sans'")
                  property.value[i][j] = "'Open Sans', open-sans-normal-400-fallback";
              });
            });
          }
        },
      },
    },
  ],
};
