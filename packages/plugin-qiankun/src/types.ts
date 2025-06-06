/**
 * @author Kuitos
 * @since 2019-06-20
 */

import { BaseIConfig } from '@umijs/types';
import { FrameworkConfiguration, FrameworkLifeCycles } from 'cyber-qiankun';

export type HistoryType = 'browser' | 'hash';
export type App = {
  name: string;
  entry: string | { scripts: string[]; styles: string[] };
  base?: string | string[];
  history?: HistoryType;
  // 取 entry 时是否需要开启跨域 credentials
  credentials?: boolean;
  props?: any;
} & Pick<BaseIConfig, 'mountElementId'>;

export type MicroAppRoute = {
  path: string;
  microApp: string;
} & Record<string, any>;

export type MasterOptions = {
  enable?: boolean;
  apps?: App[];
  routes?: MicroAppRoute[];
  lifeCycles?: FrameworkLifeCycles<object>;
  masterHistoryType?: HistoryType;
  base?: string;
  // 关联路由标记的别名，默认 microApp
  routeBindingAlias?: string;
  // 导出的组件别名，默认 MicroApp
  exportComponentAlias?: string;
  // MicroApp 寻址时使用的应用名唯一键，默认是 name
  appNameKeyAlias?: string;
  // 预加载应用阈值
  prefetchThreshold?: number;
} & FrameworkConfiguration;

export type SlaveOptions = {
  enable?: boolean;
  devSourceMap?: boolean;
  keepOriginalRoutes?: boolean | string;
  shouldNotModifyRuntimePublicPath?: boolean;
  shouldNotModifyDefaultBase?: boolean;
  // library name 是否增加 -[name] 应对多 chunk 场景
  shouldNotAddLibraryChunkName?: boolean;
  masterEntry?: string;
};

declare module '@umijs/types' {
  //@ts-ignore
  interface BaseIConfig {
    // @ts-ignore
    qiankun: {
      master?: MasterOptions;
      slave?: SlaveOptions;
    };
  }
}
