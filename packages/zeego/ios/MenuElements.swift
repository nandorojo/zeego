import ExpoModulesCore
import SwiftUI

// anything that could be a menu item
enum MenuElement {
  case item(MenuItem)
  case separator
  case label(MenuLabel)
  case group(MenuGroup)
  case checkboxItem(MenuCheckboxItem)
  case submenu(SubMenuItem)
}

struct MenuGroup {
  var label: String? = ""
  var horizontal: Bool = false
  var children: [MenuElement]
}

struct MenuItemShared {
  var text: String = ""
  var subtitle: String?
  var image: UIImage?
  var icon: MenuItemIcon?
}

struct MenuItemIcon {
  var name: String
  // add more properties like colors, ...
}

struct MenuItem {
  var text: String = ""
  var subtitle: String?
  var image: UIImage?
  var destructive: Bool? = false
  var onSelect: EventDispatcher
  var icon: MenuItemIcon?
}

class MenuCheckboxItem: ObservableObject {
  var text: String
  var subtitle: String?
  var image: UIImage?
  var destructive: Bool? = false
  @Published var checked: Bool = false
  var onValueChange: EventDispatcher
  init(
    text: String, subtitle: String? = nil, image: UIImage? = nil, destructive: Bool? = nil,
    checked: Bool = false, onValueChange: EventDispatcher
  ) {
    self.text = text
    self.subtitle = subtitle
    self.image = image
    self.destructive = destructive
    self.checked = checked
    self.onValueChange = onValueChange
  }
}

struct SubMenuItem {
  var text: String
  var subtitle: String?
  var image: UIImage?
  var destructive: Bool? = false
  var onSelect: EventDispatcher?
  var children: [MenuElement]
  var icon: MenuItemIcon?
}

struct MenuLabel {
  var text: String
}

struct MenuSeparator {
}
