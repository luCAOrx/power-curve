import {randomUUID} from 'node:crypto';
import {FileMustBeLessThan200Characters} from './errors/file-must-be-less-than-200-characters';
import {FileMustBeMoreThan25Characters} from './errors/file-must-be-more-than-25-characters';
import {FileShouldNotBeEmpty} from './errors/file-should-not-be-empty';
import {NameMustBeLessThan255Characters} from './errors/name-must-be-less-than-255-characters';
import {NameMustBeThan5Characters} from './errors/name-must-be-than-5-characters';
import {NameShouldNotBeEmpty} from './errors/name-should-not-be-empty';

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
    if (!props.name) throw new NameShouldNotBeEmpty()
    if (props.name.length > 255) throw new NameMustBeLessThan255Characters()
    if (props.name.length < 5) throw new NameMustBeThan5Characters()

    if (
      !props.file ||
      props.file === 'null' ||
      props.file === 'undefined' ||
      (typeof props.file === 'string' && props.file.trim() === '')
    ) throw new FileShouldNotBeEmpty()
    if (props.file.length > 200) throw new FileMustBeLessThan200Characters()
    if (props.file.length < 25) throw new FileMustBeMoreThan25Characters()

    return new PowerCurve(props, id)
  }
}
