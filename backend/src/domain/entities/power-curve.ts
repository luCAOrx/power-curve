import {randomUUID} from 'node:crypto';

type PowerCurveProps = {
  name: string
  file: string
}

export class PowerCurve {
  private readonly _id: string;
  private _props: PowerCurveProps;
  private _created_at: Date;

  public get id(): string {
    return this._id;
  }

  public get props(): PowerCurveProps {
    return this._props;
  }
  public set props(value: PowerCurveProps) {
    this._props = value;
  }

  public get created_at(): Date {
    return this._created_at;
  }
  public set created_at(value: Date) {
    this._created_at = value;
  }

  constructor(props: PowerCurveProps, id?: string) {
    this._id = id ?? randomUUID()
    this.created_at = new Date()
    this.props = props
  }

  static create(props: PowerCurveProps, id?: string): PowerCurve {
    if (!props.name) throw new Error('The field name should not be empty')
    if (props.name.length > 255) throw new Error('The field name must be less than 255 characters')
    if (props.name.length < 5) throw new Error('The field name must be than 5 characters')

    if (
      !props.file ||
      props.file === 'null' ||
      props.file === 'undefined' ||
      (typeof props.file === 'string' && props.file.trim() === '')
    ) throw new Error('The field file should not be empty')
    if (props.file.length > 200) throw new Error('The field file must be less than 200 characters')
    if (props.file.length < 25) throw new Error('The file field must be more than 25 characters')

    return new PowerCurve(props, id)
  }
}
