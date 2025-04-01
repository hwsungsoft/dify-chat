import React, { useContext, useState } from 'react'

import { DifyAppStore, IDifyAppItem } from '../storage'

export type IDifyChatMode = 'singleApp' | 'multiApp'

interface IDifyChatContextBase {
	/**
	 * 当前用户
	 */
	user: string
}

/**
 * 单应用模式下的上下文
 */
export interface IDifyChatContextSingleApp extends IDifyChatContextBase {
	/**
	 * 交互模式 - 单应用
	 */
	mode: 'singleApp'
	/**
	 * 当前应用配置
	 */
	appConfig: Pick<IDifyAppItem, 'requestConfig' | 'answerForm'>
}

/**
 * 多应用模式下的上下文
 */
export interface IDifyChatContextMultiApp extends IDifyChatContextBase {
	/**
	 * 交互模式 - 多应用
	 */
	mode: 'multiApp'
	/**
	 * 应用服务，用于实现应用列表的 CRUD 管理
	 */
	appService: DifyAppStore
	/**
	 * 是否允许用户配置, 启用后界面会展示设置按钮，点击可对应用进行增删改操作, 默认为 true
	 */
	enableSetting?: boolean
}

/**
 * DifyChat 上下文类型
 */
type IDifyChatContext = IDifyChatContextSingleApp | IDifyChatContextMultiApp

const DEFAULT_CONTEXT_VALUE: IDifyChatContext = {
	mode: 'multiApp',
	user: '',
	// 修正为符合 DifyAppStore 类型的初始值，这里假设可以使用一个空对象作为初始值
	appService: {} as DifyAppStore,
	enableSetting: true,
}

/**
 * 单应用模式下的默认上下文
 */
const DEFAULT_CONTEXT_VALUE_SINGLE_APP: IDifyChatContextSingleApp = {
	mode: 'singleApp',
	user: '',
	appConfig: {
		requestConfig: {
			apiBase: '',
			apiKey: '',
		},
		answerForm: {
			enabled: false,
			feedbackText: '',
		},
	},
}

/**
 * DifyChat 全局上下文
 */
export const DifyChatContext = React.createContext<IDifyChatContext>(DEFAULT_CONTEXT_VALUE)

/**
 * DifyChatContext 的 Provider
 */
export const DifyChatProvider = DifyChatContext.Provider

/**
 * 使用 DifyChat 的 context 值
 */
export const useDifyChat = (): IDifyChatContext & IGlobalStore => {
	const [currentAppConfig, setCurrentAppConfig] = useState<IDifyAppItem>({} as IDifyAppItem)
	const difyChatContext = useContext(DifyChatContext)
	const { mode } = difyChatContext
	const defaultValue =
		mode === 'multiApp' ? DEFAULT_CONTEXT_VALUE : DEFAULT_CONTEXT_VALUE_SINGLE_APP
	return {
		currentAppConfig,
		setCurrentAppConfig,
		...defaultValue,
		...difyChatContext,
	}
}

interface IGlobalStore {
	/**
	 * 当前的应用配置
	 */
	currentAppConfig: IDifyAppItem
	/**
	 * 更新当前的应用配置
	 */
	setCurrentAppConfig: (config: IDifyAppItem) => void
}
