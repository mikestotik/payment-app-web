export const ROUTE_CONFIG = {
  APP: {
    SEGMENTS: {
      ROOT: 'app',
      HOME: 'home'
    },
    getRootPath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }`;
    },
    getHomePath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.APP.SEGMENTS.HOME }`;
    }
  },
  PAYMENT: {
    SEGMENTS: {
      ROOT: 'payment',
      CREATE: 'create',
      SUCCESS: 'success'
    },
    getRootPath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.ROOT }`;
    },
    getCreatePath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.CREATE }`;
    },
    getDetailsPath: (id: number | string = '') => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.CREATE }/${ id }`;
    },
    getSuccessPath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.ROOT }/${ ROUTE_CONFIG.PAYMENT.SEGMENTS.SUCCESS }`;
    }
  },
  CONTACTS: {
    SEGMENTS: {
      ROOT: 'contacts',
      DETAILS: 'details'
    },
    getRootPath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.CONTACTS.SEGMENTS.ROOT }`;
    },
    getDetailsPath: (id: number | string = '') => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.CONTACTS.SEGMENTS.ROOT }/${ ROUTE_CONFIG.CONTACTS.SEGMENTS.DETAILS }/${ id }`;
    }
  },
  METHODS: {
    SEGMENTS: {
      ROOT: 'methods',
      DETAILS: 'details',
      CARD: 'card',
      ACCOUNT: 'account'
    },
    getRootPath: () => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.METHODS.SEGMENTS.ROOT }`;
    },
    getCardPath: (id: number | string = '') => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.METHODS.SEGMENTS.ROOT }/${ ROUTE_CONFIG.METHODS.SEGMENTS.CARD }/${ id }`;
    },
    getAccountPath: (id: number | string = '') => {
      return `/${ ROUTE_CONFIG.APP.SEGMENTS.ROOT }/${ ROUTE_CONFIG.METHODS.SEGMENTS.ROOT }/${ ROUTE_CONFIG.METHODS.SEGMENTS.ACCOUNT }/${ id }`;
    }
  },
  AUTH: {
    SEGMENTS: {
      ROOT: 'auth',
      SIGN_IN: 'sign-in'
    },
    getRootPath: () => {
      return `/${ ROUTE_CONFIG.AUTH.SEGMENTS.ROOT }`;
    },
    getSignInPath: () => {
      return `/${ ROUTE_CONFIG.AUTH.SEGMENTS.ROOT }/${ ROUTE_CONFIG.AUTH.SEGMENTS.SIGN_IN }`;
    }
  }
};
