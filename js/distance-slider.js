document.addEventListener('DOMContentLoaded', () => {
    const distanceRange = document.getElementById('distanceRange');
    const tooltip = document.getElementById('tooltip');

    const updateTooltip = () => {
      const value = distanceRange.value;
      const max = distanceRange.max;
      const min = distanceRange.min;
      const rangeWidth = distanceRange.offsetWidth;
      const tooltipWidth = tooltip.offsetWidth;

      const percent = (value - min) / (max - min);
      const offset = percent * (rangeWidth - tooltipWidth);

      tooltip.style.left = `${offset+20}px`;
      tooltip.textContent = `${value}m`;

      if (value % 10 === 0) {
        tooltip.style.display = 'block';
      } else {
        tooltip.style.display = 'none';
      }
    };

    const updateBackground = () => {
      const value = distanceRange.value;
      distanceRange.style.background = `linear-gradient(to right, rgb(130, 130, 130) 0%, rgb(130, 130, 130) ${(value / 10)}%, rgb(190, 199, 175) ${(value / 10)}%, rgb(190, 199, 175) 100%)`;
    };

    distanceRange.addEventListener('input', () => {
      updateTooltip();
      updateBackground();
    });

    updateTooltip();
    updateBackground();
  });