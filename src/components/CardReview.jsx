import PropTypes from 'prop-types';

const formatDateExtensive = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const CardReview = ({ review }) => {
  const defaultReview = {
    id: 'default',
    content: 'Nenhuma resenha disponível no momento.',
    author: 'Autor Desconhecido',
    created_at: new Date().toISOString(),
    author_details: { rating: 'N/A' }
  };

  const currentReview = review || defaultReview;

  // Function to truncate text and add ellipsis
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="card bg-eadbc8 border-0">
      <div className="card-body p-4 position-relative">
        <p
          className="card-text text-break"
          style={{
            height: '245px',
            overflow: 'hidden'
          }}
        >
          {truncateText(currentReview.content, 350)}
        </p>
        <div className="d-flex justify-content-between align-items-end">
          <div>
            <p className="mb-1">por <span className="fw-bold text-102c57">{currentReview.author}</span></p>
            <p className="text-muted mb-0">
              {formatDateExtensive(currentReview.created_at)}
            </p>
          </div>
          <p className="position-absolute bottom-0 end-0 m-4">
            Nota: <span className="fw-bold text-102c57">{currentReview.author_details.rating || 'N/A'}</span>/10
          </p>
        </div>
      </div>
    </div>
  );
};

CardReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    created_at: PropTypes.string,
    author_details: PropTypes.shape({
      rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  })
};

export default CardReview;