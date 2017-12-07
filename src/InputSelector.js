import React from 'react';
import _ from 'lodash';
import './toggle-switch.css'

class InputSelector extends React.Component {

    onChange(value) {
        this.setState({
            radio: value,
        })
        this.props.callback(value)
    }

    render() {
        const disabled = [];
        if (this.props.disabled) {
            for (let c of this.props.disabled) {
                const i = this.props.choices.indexOf(c);
                if (i !== -1) {
                    disabled[i] = true;
                }
            }
        }
        const n = this.props.choices.length;
        const choices = _(this.props.choices)
            .flatMap((c, i) => {
                const id = this.props.id + "-" + i;
                return [
                    <input
                        id={id}
                        name={this.props.id}
                        type="radio"
                        checked={this.props.checked === c}
                        onChange={() => { this.onChange(c) }}
                        disabled={disabled[i]}
                    />,
                    <label htmlFor={id} onclick="">{c}</label>
                ];
            });

        return <div className={`switch-toggle switch-${n} switch-candy`}>
            {choices.value()}
            <a></a>
        </div>

    }
}
export default InputSelector;