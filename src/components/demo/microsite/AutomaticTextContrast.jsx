const getLuminance = (color) => {
    if (!color || typeof color !== 'string') {
      console.error("Invalid color value:", color);
      return 0; // Valor por defecto si el color es inválido
    }
  
    // Asegurarse de que el color sea hexadecimal (como #RRGGBB)
    if (color.startsWith('#')) {
      color = color.slice(1); // Eliminar el "#" si está presente
    }
  
    const rgb = color.match(/\w\w/g);
  
    // Si el color no es válido o no se encuentra un valor hex
    if (!rgb || rgb.length !== 3) {
      console.error("Invalid color format:", color);
      return 0; // Valor por defecto
    }
  
    const rgbValues = rgb.map((c) => parseInt(c, 16) / 255);
    const [r, g, b] = rgbValues.map((c) => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
  
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const getContrastColor = (bgColor) => {
    const luminance = getLuminance(bgColor);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };
  
  export function ContrastText({ bgColor, children }) {
    // Validar que bgColor sea un string antes de pasar a getContrastColor
    const textColor = getContrastColor(bgColor);
    const style = {
      color: textColor
    };
  
    return <div style={style}>{children}</div>;
  }
  