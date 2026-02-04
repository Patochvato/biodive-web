const ImageOptimisee = ({ src, alt, style }) => {
  const [chargee, setChargee] = React.useState(false);

  return (
    <div style={{ 
      position: 'relative', 
      overflow: 'hidden',
      backgroundColor: '#1a3a5a', // Couleur de fond "abysse"
      borderRadius: style?.borderRadius || '8px',
      ...style 
    }}>
      {/* L'effet de brillance (Skeleton) s'affiche tant que l'image n'est pas chargée */}
      {!chargee && (
        <div className="skeleton-animation" style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(90deg, #1a3a5a 25%, #2a4a6a 50%, #1a3a5a 75%)',
          backgroundSize: '200% 100%',
        }} />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setChargee(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: chargee ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </div>
  );
};
export default ImageOptimisee;
