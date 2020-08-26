import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { ReactStarRatingComponent } from '@/components/libs-custom';
import { Icon } from '@/components/Icon';
import classNames from 'classnames';

export const RatingField = ({
  control,
  setValue,
  baseInputsState,
  className = '',
}) => {
  return (
    <div
      className={classNames([
        className,
        'd-flex flex-column align-items-start',
      ])}
    >
      <Form.Label>Rating:</Form.Label>
      <div className="d-flex align-items-center">
        <Controller
          control={control}
          defaultValue={baseInputsState.rating}
          name="rating"
          render={({ value, onChange }) => (
            <ReactStarRatingComponent
              className="ml-n1 mr-2"
              renderStarIcon={(iconInd, currRating) => {
                return (
                  <Icon
                    className="w-8 h-8 text-yellow"
                    href={`rating${iconInd > currRating ? '-border' : ''}`}
                  />
                );
              }}
              value={+value}
              onStarClick={onChange}
            />
          )}
        />
        <Button size="sm" onClick={() => setValue('rating', 0)}>
          Reset Rating
        </Button>
      </div>
    </div>
  );
};

RatingField.propTypes = {
  baseInputsState: PropTypes.objectOf(PropTypes.oneOf(['', 0])).isRequired,
  control: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setValue: PropTypes.func.isRequired,
  className: PropTypes.string,
};
