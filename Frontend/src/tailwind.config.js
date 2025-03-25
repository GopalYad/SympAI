module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
};
