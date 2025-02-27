import ExpoModulesCore
import SwiftUI

// MARK: - Root Context Menu View
struct ContextMenuView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuProps

    func extractMenuComponents(from children: [ExpoSwiftUI.Child]?) -> (
        trigger: ExpoSwiftUI.Child?,
        preview: ExpoSwiftUI.Child?,
        content: [ExpoSwiftUI.Child]
    ) {
        var trigger: ExpoSwiftUI.Child?
        var preview: ExpoSwiftUI.Child?
        var content: [ExpoSwiftUI.Child] = []

        guard let children = children else {
            return (trigger, preview, content)
        }

        for child in children {
            let view = child.view
            if view is ExpoSwiftUI.HostingView<ContextMenuTriggerProps, ContextMenuTriggerView> {
                trigger = child
                if preview == nil {
                    let view =
                        child.view
                        as! ExpoSwiftUI.HostingView<ContextMenuTriggerProps, ContextMenuTriggerView>

                    preview = view.getProps().children?.first(where: {
                        $0.view
                            is ExpoSwiftUI.HostingView<
                                ContextMenuPreviewProps, ContextMenuPreviewView
                            >
                    })

                    print("has preview in trigger: \(type(of: preview))")
                }
                //                preview = child
            } else if view
                is ExpoSwiftUI.HostingView<ContextMenuContentProps, ContextMenuContentView>
            {
                let contentChildren =
                    (view
                    as! ExpoSwiftUI.HostingView<ContextMenuContentProps, ContextMenuContentView>)
                    .getProps().children ?? []

                for contentChild in contentChildren {
                    if contentChild.view
                        is ExpoSwiftUI.HostingView<ContextMenuPreviewProps, ContextMenuPreviewView>
                    {
                        preview = contentChild
                    } else {
                        content.append(contentChild)
                    }
                }
            }
        }

        return (trigger, preview, content)
    }

    var body: some View {
        let (trigger, preview, content) = extractMenuComponents(from: props.children)

        let _ = print("Preview: \(preview ?? nil)")

        if let trigger {
            if props.isDropdown == true {
                Menu {
                    UnwrappedChildren(children: content)
                        .onAppear {
                            print("Open Dropdown")
                            props.onOpenChange(["open": true])
                        }
                        .onDisappear {
                            print("Close Dropdown")
                            props.onOpenChange(["open": false])
                        }

                } label: {
                    trigger.frame(alignment: .topLeading).onTapGesture {
                        print("menu tapped!")
                    }
                }
            } else if #unavailable(iOS 16.0) {
                trigger
            } else {
                trigger
                    .contextMenu {
                        UnwrappedChildren(children: content)
                            .onAppear { props.onOpenChange(["open": true]) }
                            .onDisappear { props.onOpenChange(["open": false]) }
                    } preview: {
                        let previewView =
                            preview?.view
                            as? ExpoSwiftUI.HostingView<
                                ContextMenuPreviewProps, ContextMenuPreviewView
                            >
                        let triggerView =
                            trigger.view
                            as? ExpoSwiftUI.HostingView<
                                ContextMenuTriggerProps, ContextMenuTriggerView
                            >

                        let _ = print("Has preview? \(previewView != nil)")
                        ZStack(alignment: .topLeading) {
                            UnwrappedChildren(children: previewView?.getProps().children ?? [])

                        }.onAppear {
                            props.onOpenChange(["open": true])
                            print("Preview appears")
                        }
                        .onDisappear {
                            props.onOpenChange(["open": false])
                            print("Preview disappears")
                        }
                    }
            }
        } else {
            Children()
        }
    }
}

// MARK: - Content Views
struct ContextMenuContentView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuContentProps
    var body: some View {
        UnwrappedChildren()
    }
}

struct ContextMenuSubContentView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuSubContentProps
    var body: some View {
        UnwrappedChildren()
    }
}

// MARK: - Item View (Just renders children)
struct ContextMenuItemView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuItemProps

    var body: some View {
        Button(
            role: props.destructive == true ? .destructive : nil,
            action: {
                props.onSelect([:])
            }
        ) {
            if let textValue = props.textValue {
                Text(textValue)
            }
            UnwrappedChildren()
        }
        .modifier(MenuActionDismissBehaviorModifier(shouldDismiss: props.shouldDismissOnSelect))
    }
}

// Separate modifier to handle the iOS version check
struct MenuActionDismissBehaviorModifier: ViewModifier {
    let shouldDismiss: Bool

    func body(content: Content) -> some View {
        if #available(iOS 16.4, *) {
            content.menuActionDismissBehavior(shouldDismiss ? .enabled : .disabled)
        } else {
            content
        }
    }
}

// MARK: - Item Title View (Maps to SwiftUI Text)
struct ContextMenuItemTitleView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuItemTitleProps

    var body: some View {
        Text(props.text)
    }
}

// MARK: - Item Subtitle View (Maps to SwiftUI Text)
struct ContextMenuItemSubtitleView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuItemSubtitleProps

    var body: some View {
        Text(props.text)
            .font(.caption)
            .foregroundColor(.secondary)
    }
}

// MARK: - Label View (Maps to SwiftUI Text)
struct ContextMenuLabelView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuLabelProps

    var body: some View {
        Text(props.text)
            .foregroundColor(.secondary)
            .font(.footnote)
    }
}

// MARK: - Separator View (Maps to SwiftUI Divider)
class ContextMenuSeparatorProps: ExpoSwiftUI.ViewProps {
}
struct ContextMenuSeparatorView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuSeparatorProps
    var body: some View {
        Divider()
    }
}

// MARK: - Checkbox Item View (Just renders children)
struct ContextMenuCheckboxItemView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuCheckboxItemProps

    var body: some View {
        Toggle(
            isOn: Binding(
                get: { props.value == "on" },
                set: { newValue in
                    props.onValueChange(["value": newValue ? "on" : "off"])
                }
            ),
            label: {
                UnwrappedChildren()
            }
        )
        .modifier(MenuActionDismissBehaviorModifier(shouldDismiss: props.shouldDismissOnSelect))

    }
}

// MARK: - Sub View (Handles nested menu structure)
struct ContextMenuSubView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuSubProps

    func extractSubComponents(from children: [ExpoSwiftUI.Child]?) -> (
        trigger: ExpoSwiftUI.Child?,
        content: [ExpoSwiftUI.Child]
    ) {
        var trigger: ExpoSwiftUI.Child?
        var content: [ExpoSwiftUI.Child] = []

        guard let children = children else {
            return (trigger, content)
        }

        for child in children {
            let view = child.view
            if view
                is ExpoSwiftUI.HostingView<ContextMenuSubTriggerProps, ContextMenuSubTriggerView>
            {
                trigger = child
            } else {
                content.append(child)
            }
        }

        return (trigger, content)
    }

    var body: some View {
        let (trigger, content) = extractSubComponents(from: props.children)

        if let trigger {
            Menu {
                UnwrappedChildren(children: content)
            } label: {
                UnwrappedChildren(children: [trigger])
            }
        } else {
            UnwrappedChildren()
        }
    }
}

// MARK: - Sub Trigger View (Just renders children)
struct ContextMenuSubTriggerView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuSubTriggerProps

    var body: some View {
        Button(
            role: props.destructive ? .destructive : nil,
            action: {
                props.onSelect([:])
            },
            label: {
                UnwrappedChildren()
            })
    }
}

// MARK: - Preview View
struct ContextMenuPreviewView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuPreviewProps
    @EnvironmentObject var shadowNodeProxy: ExpoSwiftUI.ShadowNodeProxy

    var body: some View {
        EmptyView().frame(width: 0, height: 0)
    }
}

// MARK: - Props
class ContextMenuProps: ExpoSwiftUI.ViewProps {
    var onOpenChange = EventDispatcher()
    @Field var isDropdown: Bool? = false
    @Field var open: Bool = false
}

class ContextMenuItemProps: ExpoSwiftUI.ViewProps {
    var onSelect = EventDispatcher()
    @Field var shouldDismissOnSelect: Bool = true
    @Field var destructive: Bool? = false
    @Field var textValue: String?
}

class ContextMenuItemTitleProps: ExpoSwiftUI.ViewProps {
    @Field var text: String = ""
}

class ContextMenuItemSubtitleProps: ExpoSwiftUI.ViewProps {
    @Field var text: String = ""
}

class ContextMenuLabelProps: ExpoSwiftUI.ViewProps {
    @Field var text: String = ""
}

class ContextMenuCheckboxItemProps: ExpoSwiftUI.ViewProps {
    var onValueChange = EventDispatcher()
    @Field var shouldDismissOnSelect: Bool = true
    @Field var value: String = "off"
}

class ContextMenuSubProps: ExpoSwiftUI.ViewProps {}

class ContextMenuSubTriggerProps: ExpoSwiftUI.ViewProps {
    var onSelect = EventDispatcher()

    @Field var destructive: Bool = false

}

class ContextMenuPreviewProps: ExpoSwiftUI.ViewProps {}

class ContextMenuContentProps: ExpoSwiftUI.ViewProps {}

class ContextMenuSubContentProps: ExpoSwiftUI.ViewProps {}

// MARK: - Trigger View
struct ContextMenuTriggerView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuTriggerProps

    var body: some View {
        Children()
    }
}

class ContextMenuTriggerProps: ExpoSwiftUI.ViewProps {
    @Field var preview: [ExpoSwiftUI.Child]? = []
}

// MARK - group view
struct ContextMenuGroupView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuTriggerProps

    var body: some View {
        UnwrappedChildren()
    }
}

class ContextMenuGroupProps: ExpoSwiftUI.ViewProps {}

// MARK - item icon view
struct ContextMenuItemIconView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuItemIconProps

    var body: some View {
        Image(systemName: props.name)
    }
}

class ContextMenuItemIconProps: ExpoSwiftUI.ViewProps {
    @Field var name: String = ""
}

// MARK - item image view
struct ContextMenuItemImageView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuItemImageProps

    var body: some View {
        if let url = URL(string: props.source.uri) {
            AsyncImage(url: url) { phase in
              let _ = print("Async Image \(phase): \(url.absoluteString)")
                switch phase {
                case .empty:
                    ProgressView()
                case .success(let image):
                    image
                        .resizable()
                        .scaledToFit()
                case .failure:
                    Image(systemName: "photo")
                        .foregroundColor(.gray)
                @unknown default:
                    EmptyView()
                }
            }
        } else {
            Image(systemName: "photo")
                .foregroundColor(.gray)
        }
    }
}

struct ImageSource: Record {
    @Field var uri: String
}

class ContextMenuItemImageProps: ExpoSwiftUI.ViewProps {
    @Field var source: ImageSource
}

// MARK - item accessory view
struct ContextMenuAccessoryView: ExpoSwiftUI.View {
    @EnvironmentObject var props: ContextMenuItemIconProps

    var body: some View {
        Image(systemName: props.name)
    }
}

class ContextMenuItemAccessoryProps: ExpoSwiftUI.ViewProps {
    @Field var name: String = ""
}
