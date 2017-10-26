import React from 'react';
import PropTypes from 'prop-types';
import {FormControl, FormGroup, ControlLabel, HelpBlock, InputGroupAddon} from 'react-bootstrap';

export default class ValidatedInput extends React.Component {
  constructor(props) {
    super(props);

    const {
      validationEvent,
      validationState,
      validate,
      errorHelp,
      help,
      groupClassName,
      labelClassName,
      wrapperClassName,
      bsSize,
      _registerInput,
      _unregisterInput,
      ...inputProps} = props;
    this._registerInput = _registerInput;
    this._unregisterInput = _unregisterInput;
    this.inputProps = inputProps;
    if (!this._registerInput || !this._unregisterInput) {
      throw new Error('Input must be placed inside the Form component');
    }
  }

  componentWillMount() {
    this._registerInput(this);
  }

  componentWillUnmount() {
    this._unregisterInput(this);
  }

  getValue() {
    return this.props.value;
  }

  render() {
    return (
        <FormGroup
          bsSize={this.props.bsSize}
          validationState={this.props.validationState} >

          {this.inputProps.label &&
            <ControlLabel className={this.props.labelClassName}>
              {this.inputProps.label}
            </ControlLabel>
          }

          {this.inputProps.prefixLabel && 
            <InputGroupAddon>{this.inputProps.prefixLabel}</InputGroupAddon>
          }

          <div className={this.props.wrapperClassName}>
            <FormControl
              ref='input'
              {...this.inputProps}
              value={this.props.value} />
            {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
          </div>

          {this.inputProps.suffixLabel && 
            <InputGroupAddon>{this.inputProps.suffixLabel}</InputGroupAddon>
          }

        </FormGroup>
      );
  }
}

ValidatedInput.propTypes = {
  name           : PropTypes.string.isRequired,
  validationEvent: PropTypes.oneOf([
    '', 'onChange', 'onBlur', 'onFocus'
  ]),
  validate       : PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]),
  errorHelp      : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

ValidatedInput.defaultProps = {
  validationEvent: ''
};
