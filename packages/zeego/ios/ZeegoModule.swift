import ExpoModulesCore
import SwiftUI

public class ZeegoModule: Module {
    public func definition() -> ModuleDefinition {
        Name("Zeego")

        View(ContextMenuView.self)
        View(ContextMenuContentView.self)
        View(ContextMenuSubContentView.self)
        View(ContextMenuTriggerView.self)
        View(ContextMenuPreviewView.self)
        View(ContextMenuItemView.self)
        View(ContextMenuItemTitleView.self)
        View(ContextMenuItemSubtitleView.self)
        View(ContextMenuLabelView.self)
        View(ContextMenuSeparatorView.self)
        View(ContextMenuCheckboxItemView.self)
        View(ContextMenuSubView.self)
        View(ContextMenuSubTriggerView.self)
        View(ContextMenuGroupView.self)
        View(ContextMenuItemIconView.self)
        View(ContextMenuAccessoryView.self)
    }
}
