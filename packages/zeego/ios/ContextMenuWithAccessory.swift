
import UIKit
import SwiftUI

struct ContextMenuWithAccessory<TriggerContent: View, OverlayContent: View>: UIViewControllerRepresentable {
  let triggerContent: TriggerContent
  let overlayContent: OverlayContent
  var menuItems: [MenuItem] = []
  
  init(
    @ViewBuilder trigger: () -> TriggerContent,
    @ViewBuilder overlay: () -> OverlayContent,
    menuItems: [MenuItem] = []
  ) {
    self.triggerContent = trigger()
    self.overlayContent = overlay()
    self.menuItems = menuItems
  }
  
  func makeUIViewController(context: Context) -> CustomContextMenuController {
    let controller = CustomContextMenuController()
    controller.triggerContent = AnyView(triggerContent)
    controller.overlayContent = AnyView(overlayContent)
    controller.menuItems = menuItems
    return controller
  }
  
  func updateUIViewController(_ uiViewController: CustomContextMenuController, context: Context) {
    uiViewController.triggerContent = AnyView(triggerContent)
    uiViewController.overlayContent = AnyView(overlayContent)
    uiViewController.menuItems = menuItems
    
  }
}

class CustomContextMenuController: UIViewController, UIContextMenuInteractionDelegate {
  var overlayWindow: UIWindow?
  var triggerContent: AnyView?
  var overlayContent: AnyView?
  var menuItems: [MenuItem] = []
  
  private var interactionController: UIContextMenuInteractionAnimating?
  
  override func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = .clear
    setupTriggerView()
  }
  
  private func setupTriggerView() {
    guard let triggerContent = triggerContent else { return }
    
    // Remove existing subviews
    view.subviews.forEach { $0.removeFromSuperview() }
    
    // Create hosting controller for trigger content
    let hostingController = UIHostingController(rootView: triggerContent)
    hostingController.view.backgroundColor = .clear
    
    // Add trigger view
    let triggerView = hostingController.view!
    triggerView.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(triggerView)
    
    // Add interaction to trigger view
    let interaction = UIContextMenuInteraction(delegate: self)
    triggerView.addInteraction(interaction)
    
    // Setup constraints
    NSLayoutConstraint.activate([
      triggerView.topAnchor.constraint(equalTo: view.topAnchor),
      triggerView.bottomAnchor.constraint(equalTo: view.bottomAnchor),
      triggerView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
      triggerView.trailingAnchor.constraint(equalTo: view.trailingAnchor)
    ])
  }
  
  func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
    return UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ -> UIMenu? in
      // Create actions dynamically from menuItems
      let actions = self.menuItems.compactMap { item -> UIAction? in
          return UIAction(title: item.text ?? "", subtitle: item.subtitle) { _ in
          print("\(item.text) selected")
        }
      }
      return UIMenu(title: "", children: actions)
    }
  }
  
  func contextMenuInteraction(_ interaction: UIContextMenuInteraction, willDisplayMenuFor configuration: UIContextMenuConfiguration, animator: UIContextMenuInteractionAnimating?) {
    self.interactionController = animator
    addOverlay(near: interaction.view)
  }
  
  func contextMenuInteraction(_ interaction: UIContextMenuInteraction, willEndFor configuration: UIContextMenuConfiguration, animator: UIContextMenuInteractionAnimating?) {
    removeOverlay()
  }
  
  
  private func addOverlay(near triggerView: UIView?) {
    guard overlayWindow == nil,
          let triggerView = triggerView,
          let overlayContent = overlayContent else { return }
    
    let window = PassthroughWindow(frame: UIScreen.main.bounds)
    window.windowLevel = .alert + 1
    window.backgroundColor = .clear
    window.isHidden = false
    
    let overlayView = PassthroughView(frame: window.bounds)
    overlayView.backgroundColor = .clear
    
    let hostingController = UIHostingController(rootView: overlayContent)
    hostingController.view.backgroundColor = .clear
    
    let hostingView = hostingController.view!
    hostingView.translatesAutoresizingMaskIntoConstraints = false
    overlayView.addSubview(hostingView)
    
    let triggerFrame = triggerView.convert(triggerView.bounds, to: nil)
    let isMenuAbove = triggerFrame.midY > UIScreen.main.bounds.height / 2
    
    let yConstraint = isMenuAbove
    ? hostingView.topAnchor.constraint(equalTo: overlayView.topAnchor, constant: triggerFrame.maxY + 10)
    : hostingView.bottomAnchor.constraint(equalTo: overlayView.bottomAnchor, constant: -(window.bounds.height - triggerFrame.minY + 10))
    
    NSLayoutConstraint.activate([
      hostingView.centerXAnchor.constraint(equalTo: overlayView.centerXAnchor),
      yConstraint
    ])
    
    window.addSubview(overlayView)
    overlayWindow = window
  }
  
  private func removeOverlay() {
    overlayWindow?.isHidden = true
    overlayWindow = nil
  }
}

// PassthroughWindow and PassthroughView remain unchanged

// Custom window that passes through touches (unchanged)
class PassthroughWindow: UIWindow {
  override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
    let hitView = super.hitTest(point, with: event)
    return hitView == self ? nil : hitView
  }
}

// Custom view that passes through touches (unchanged)
class PassthroughView: UIView {
  override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
    let hitView = super.hitTest(point, with: event)
    return hitView == self ? nil : hitView
  }
}

