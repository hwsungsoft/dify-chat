/**
 * 头部标题区域容器
 */
export default function CenterTitleWrapper(props: { children: React.ReactNode }) {
	return (
		<div className="flex h-full items-center flex-[3] overflow-hidden justify-center text-primary font-semibold">
			<div className="flex items-center rounded-3xl shadow-md py-2 px-4 text-sm bg-white">
				{props.children}
			</div>
		</div>
	)
}
