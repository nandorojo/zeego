import SwiftUI

struct ToggleView: View {
  @ObservedObject var checkboxItem: MenuCheckboxItem
  var body: some View {
    Toggle(checkboxItem.text, isOn: $checkboxItem.checked)
      .onChange(of: checkboxItem.checked) { newValue in
        checkboxItem.onValueChange(["value": newValue])
      }
  }
}
