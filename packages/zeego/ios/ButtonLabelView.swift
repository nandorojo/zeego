import SwiftUI

struct ButtonLabelView: View {
  var text: String
  var subtitle: String?
  var image: UIImage?
  var icon: MenuItemIcon?
  
  var body: some View {
    if let image = image {
      Label(
        title: {
          Text(text)
          if let subtitle = subtitle {
            Text(subtitle)
          }
        },
        icon: { Image(uiImage: image) }
      )
    } else if let icon = icon {
      Label(
        title: {
          Text(text)
          if let subtitle = subtitle {
            Text(subtitle)
          }
        },
        icon: { Image(systemName: icon.name) }
      )
    } else {
      Text(text)
      if let subtitle = subtitle {
        Text(subtitle)
      }
    }
  }
}
