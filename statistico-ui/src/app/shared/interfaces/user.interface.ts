import { ILifecycleTimestamps, IIdentity } from '../models/base.model';

export interface User extends IIdentity, ILifecycleTimestamps {
    username: string;
}
