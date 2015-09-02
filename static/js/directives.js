// Usage: <div tooltip="Hello">
// or: <div tooltip="{{scopevar}}">
bugtracker.directive('tooltip', [function() {

    return {
        // This directive may only be added as an attribute.
        restrict: 'A',
        
        // The link function is executed when an element with this attribute is 
        // added to the DOM. The first three parameters are always scope, 
        // element, attributes.
        link: function(scope, element, attributes) {
            var tooltip = null;

            // Add event listener on initialisation
            element[0].addEventListener('mouseenter', addTooltip);
            element[0].addEventListener('mouseleave', removeTooltip);
            element[0].addEventListener('mousemove', repositionTooltip);

            // Remove event listener when the element is removed from the DOM
            scope.$on('$destroy', function() {
                element[0].removeEventListener('mouseenter', addTooltip);
                element[0].removeEventListener('mouseleave', removeTooltip);
                element[0].removeEventListener('mousemove', repositionTooltip);
                removeTooltip();
            });


            // Below: basic methods that do what their names indicate ----------

            function addTooltip(event) {
                if (attributes.tooltip.trim()) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.appendChild(document.createTextNode(attributes.tooltip));
                    repositionTooltip(event);
                    document.body.appendChild(tooltip);
                }
            }

            function repositionTooltip(event) {
                if (tooltip) {
                    var s = tooltip.style;
                    s.left = String(event.clientX) + 'px';
                    s.top = String(event.clientY - tooltip.offsetHeight) + 'px';
                }
            }

            function removeTooltip() {
                if (tooltip) {
                    document.body.removeChild(tooltip);
                    tooltip = null;
                }
            }
        }
    }

}]);


bugtracker.directive('autofocus', ['$timeout', function($timeout) {

    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function() {
                element[0].focus();
            });
        }
    }

}]);
