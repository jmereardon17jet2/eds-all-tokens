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
};
